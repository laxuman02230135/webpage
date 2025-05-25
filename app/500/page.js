export const metadata = {
  title: '500 - Server Error',
  description: 'An error occurred on the server.',
};

export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">500 - Server Error</h2>
        <p className="text-gray-600 mb-4">Sorry, something went wrong on our end.</p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Return Home
        </a>
      </div>
    </div>
  );
} 