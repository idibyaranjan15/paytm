export const SendMoney = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg border p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Send Money</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-xl text-white">💸</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700">
            Transfer Funds
          </h3>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (in Rs)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:ring focus:ring-green-300"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 rounded-md bg-green-500 text-white text-sm font-medium transition hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Initiate Transfer
          </button>
        </form>
      </div>
    </div>
  );
};
