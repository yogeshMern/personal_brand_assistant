import React, { useState } from "react";
import axios from "axios";
import {
  Calendar,
  Sparkles,
  Copy,
  X,
  Keyboard,
  Bot,
  Share2,
  Loader2,
} from "lucide-react";

const AIBoatHome = () => {
  const [profession, setProfession] = useState("");
  const [calendarData, setCalendarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // API call function (using axios)
  const generateCalendar = async (e) => {
    e.preventDefault();
    if (!profession.trim()) return;

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/gemini/text",
        { profession },
        { headers: { "Content-Type": "application/json" } }
      );

      setCalendarData(data); // API returns { profession, calendar }
    } catch (error) {
      console.error("Error generating calendar:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy all captions
  const copyAllCaptions = () => {
    if (!calendarData) return;
    const allText = calendarData.calendar
      .map((item) => `Day ${item.day}: ${item.title}\n${item.caption}`)
      .join("\n\n");
    navigator.clipboard.writeText(allText);
    alert("All captions copied to clipboard!");
  };

  // Copy single caption
  const copySingleCaption = (item) => {
    const text = `Day ${item.day}: ${item.title}\n${item.caption}`;
    navigator.clipboard.writeText(text);
    alert(`Day ${item.day} caption copied!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-indigo-800">AI Boat</h1>
          </div>
          <p className="text-lg text-gray-600 mt-3">
            Generate a 7-day content calendar tailored to your profession
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Generate Your Content Calendar
          </h2>
          <form
            onSubmit={generateCalendar}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Enter your profession (e.g., Software Engineer)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-75 min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {calendarData && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Content Calendar for{" "}
                <span className="text-indigo-600">
                  {calendarData.profession}
                </span>
              </h2>
              <button
                onClick={() => setCalendarData(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {calendarData.calendar.map((item) => (
                <div
                  key={item.day}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition relative"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold rounded-full">
                      {item.day}
                    </div>
                    <h3 className="ml-3 font-medium text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.caption}</p>
                  <button
                    onClick={() => copySingleCaption(item)}
                    className="mt-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 text-sm rounded-lg hover:bg-indigo-100 transition flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={copyAllCaptions}
                className="px-5 py-2 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All Captions
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!calendarData && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Keyboard className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">
                  Enter Your Profession
                </h3>
                <p className="text-gray-600">
                  Tell us what you do, and we'll create relevant content ideas.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">
                  AI Generates Content
                </h3>
                <p className="text-gray-600">
                  Our AI creates a 7-day content calendar tailored to your
                  field.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Share Your Content</h3>
                <p className="text-gray-600">
                  Use the ideas to create engaging content for your audience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} AI Boat - Content Calendar Generator
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AIBoatHome;
