# 🎮 Connect 4 – Desktop Game (Electron + AI)

A polished **Connect 4 desktop application** built from scratch using **Electron and JavaScript**, featuring a modern UI, smooth animations, sound effects, and a strong AI powered by **Minimax with Alpha-Beta Pruning**.

This project focuses on both **game logic** and **user experience**, while also tackling real-world challenges like desktop packaging, permissions, and build pipelines.

---

## ✨ Features

### 🧑‍🤝‍🧑 Game Modes
- **Human vs Human**
- **Human vs Computer**

### 🤖 AI Difficulty Levels
- **Easy** – Random valid moves  
- **Medium** – Blocks immediate opponent wins  
- **Hard** – Heuristic-based strategic play  
- **Expert** – Minimax algorithm with alpha-beta pruning (depth-limited)

### 🎨 User Experience
- Smooth **disc drop animations**
- **Winning glow** effect on 4 connected discs
- Sound effects for:
  - Disc drop
  - Win
  - Draw
  - Button clicks
- Clean, themed **main menu UI**
- In-game **win modal** with restart & mode change

### 🖥 Desktop Ready
- Built using **Electron**
- Packaged as a **Windows executable (.exe)**
- Custom app icon
- No browser required

---

## 🧠 AI Implementation

The **Expert difficulty** uses:
- **Minimax algorithm**
- **Alpha-Beta pruning** for performance
- Depth-limited search to ensure smooth gameplay in JavaScript

This allows the AI to:
- Anticipate future board states
- Block strong threats
- Prioritize winning positions
- Feel challenging and near-unbeatable

---

## 🛠 Tech Stack

- **JavaScript**
- **Electron**
- **HTML5**
- **CSS3**
- **Node.js**

---

## 🚀 Getting Started


### ▶ Run Locally
```bash
npm install
npm start

---

## 📸 Demo

### 🎮 Gameplay Preview
![Connect 4 Demo](https://github.com/user-attachments/assets/3effe80b-e96b-4476-a843-994db92458c6)

---

### 🖼 Screenshots

**Main Menu**  
![Main Menu](https://github.com/user-attachments/assets/ebcac8b2-5a0e-4f06-820a-7263de746356)

**Gameplay**  
![Gameplay](https://github.com/user-attachments/assets/f5903041-0215-464a-88da-d4fafcf9)

**Win State**  
![Win State](https://github.com/user-attachments/assets/7f99)

