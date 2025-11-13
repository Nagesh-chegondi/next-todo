import './styles/globals.css'

export const metadata = { title: 'Todo App' };

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
