import streamlit as st
from knowledge_base import knowledge_base

# --- Page Setup ---
st.set_page_config(page_title="Smart Rule-Based Chatbot", layout="centered")
st.title("Smart Rule-Based Chatbot")

# --- Chat History ---
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# --- Response Logic ---
def get_bot_response(user_input):
    message = user_input.lower()
    for topic, data in knowledge_base.items():
        if any(keyword in message for keyword in data["keywords"]):
            return data["response"]
    return "I'm not sure how to respond to that yet. Try asking about your project, models, or metrics."

# --- Display Chat History ---
for speaker, message in st.session_state.chat_history:
    st.markdown(f"**{speaker}:** {message}")

# --- Input Form ---
with st.form(key="chat_form", clear_on_submit=True):
    user_input = st.text_input("You:", placeholder="Type your message here...")
    submitted = st.form_submit_button("Send")

if submitted and user_input:
    response = get_bot_response(user_input)
    st.session_state.chat_history.append(("You", user_input))
    st.session_state.chat_history.append(("Assistant", response))
    st.rerun()
