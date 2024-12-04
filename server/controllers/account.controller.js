import Account from "../models/account.model.js";
import mongoose from "mongoose";

export const getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const transferAmount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.error("Transfer error:", error);
    await session.abortTransaction();
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  } finally {
    session.endSession();
  }
};
