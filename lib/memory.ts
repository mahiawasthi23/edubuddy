let history: any[] = [];

export function getHistory() {
  return history;
}

export function addMessage(role: string, content: string) {
  history.push({ role, content });

  if (history.length > 6) {
    history.shift();
  }
}

export function clearHistory() {
  history = [];
}
