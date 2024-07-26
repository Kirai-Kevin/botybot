1.   https://docs.google.com/document/d/1u79vT1DE711ogJPcfytfJhuhQ6zCasxS9b0ssVISSN8/edit?usp=sharing
2.   https://docs.google.com/document/d/15begR3ItE6AjT9tUmMhGjEF3glr03ie92Ni6eeINVjQ/edit?usp=sharing
3.   https://docs.google.com/document/d/1LIduJHbcavC0Ud0TAXdHifzWiz2lEVyi1kxkUL6HuM0/edit?usp=sharing
4.   https://docs.google.com/document/d/1Am5qT6RObojuCYnSNcYP9XS55AWP9l1UThtg_SZHoXk/edit?usp=sharing


## Deployment and Usage Instructions

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Setup
1. Clone the repository:
   ```
   git clone https://github.com/Kirai-Kevin/botybot.git
   cd botybot
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the project root and add:
   ```
   SECRET_KEY=your_secret_key
   DATABASE_URI=sqlite:///your_database.db
   GEMINI_API_KEY=your_gemini_api_key
   ```

### Running the Application
1. Initialize the database:
   ```
   python
   >>> from app import create_tables
   >>> create_tables()
   >>> exit()
   ```

2. Start the Flask development server:
   ```
   python app.py
   ```

3. Access the application at `http://localhost:5000`
