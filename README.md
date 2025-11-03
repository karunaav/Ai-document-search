# RAG Chatbot - AI Document Search

A powerful retrieval-augmented generation (RAG) chatbot that allows you to upload PDF documents and ask questions about their content. The AI analyzes your documents and provides accurate, contextual answers.

## Features

- 📄 **PDF Upload**: Upload and process PDF documents
- 🔍 **Semantic Search**: TF-IDF based search for relevant document chunks
- 💬 **Chat Interface**: Interactive chat to ask questions about your documents
- ⚡ **Fast Processing**: Efficient text extraction and chunking
- 🎨 **Modern UI**: Beautiful dark-themed interface built with React and Tailwind CSS

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11
- **PDF Processing**: PyPDF2
- **Text Processing**: LangChain
- **Search**: TF-IDF with scikit-learn
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Project Structure

```
ai-document-search/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Environment variables
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main component
│   │   ├── App.css           # Styles
│   │   ├── main.jsx          # Entry point
│   │   └── components/
│   │       ├── FileUpload.jsx
│   │       └── ChatWindow.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
└── README.md
```

## Installation

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

## Configuration

### Backend (.env)

Create a `.env` file in the `backend` folder:

```
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: The current version uses free TF-IDF search and doesn't require an OpenAI API key for basic functionality.

### Frontend (.env)

Create a `.env` file in the `frontend` folder:

```
VITE_API_URL=http://localhost:8000
```

## Running Locally

### Start Backend

```bash
cd backend
venv\Scripts\activate  # Windows
python -m uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Usage

1. Open `http://localhost:5173` in your browser
2. Upload a PDF document using the drag-and-drop interface
3. Wait for the document to be processed
4. Ask questions about the document content
5. Get instant, accurate answers

## API Endpoints

### Health Check
```
GET /health
```

### Upload PDF
```
POST /upload
Content-Type: multipart/form-data

Body: PDF file
Response: {"message": "Success", "status": "success"}
```

### Query Document
```
POST /query
Content-Type: application/json

Body: {"query": "Your question here"}
Response: {"answer": "Answer text", "source": "Document chunk info"}
```

## How It Works

1. **PDF Processing**: Extracts text from uploaded PDF files
2. **Text Chunking**: Splits text into manageable chunks (1000 characters with 200 overlap)
3. **Vectorization**: Converts text chunks into TF-IDF vectors
4. **Search**: Uses cosine similarity to find the most relevant chunk for each query
5. **Response**: Returns the relevant chunk as the answer with relevance score





## Troubleshooting

### "Module not found" errors
```bash
pip install -r requirements.txt
```

### Frontend can't connect to backend
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running
- Check CORS is enabled (it is by default)

### PDF upload fails
- Verify PDF is not corrupted
- Check file size (should be reasonable)
- Ensure backend has write permissions for temp files

## License

MIT License - feel free to use this project for personal or commercial use.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Open an issue on GitHub

## Author

Created with ❤️ for document intelligence

