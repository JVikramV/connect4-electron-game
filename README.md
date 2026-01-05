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

```

## 📸 Demo

### 🎮 Gameplay Preview
![gif](https://github.com/user-attachments/assets/5144ec1e-d00b-443e-9528-be86e0a3ac1a)


---

### 🖼 Screenshots

**Main Menu**  
<img width="1237" height="987" alt="menu" src="https://github.com/user-attachments/assets/b847aca4-ce64-4017-aac1-9e32947e2d24" />


**Gameplay**  
<img width="1902" height="1021" alt="gameplay" src="https://github.com/user-attachments/assets/f7a371ea-510e-4c37-b944-4bacb1dc89d2" />


**Win State**  
<img width="1918" height="1020" alt="win" src="https://github.com/user-attachments/assets/f4a9e633-e46f-4c38-add8-957844c31d05" />







