# SereneDash

A visually stunning and minimalist personal dashboard to provide a calm and focused start to your day.

[cloudflarebutton]

SereneDash is an elegant, minimalist personal dashboard designed to foster focus and tranquility. It replaces the new tab page with a visually calming interface that features a dynamic greeting based on the time of day, a prominent live clock, and a simple, yet powerful, daily focus and to-do list manager. All data is persisted locally for speed and privacy. The design emphasizes clean typography, generous white space, and a subtle, animated gradient background to create a serene digital environment.

## ✨ Key Features

- **Dynamic Greeting:** A warm, time-appropriate greeting to start your day right.
- **Live Clock:** A clean, prominent clock to keep you aware of the time.
- **Daily Focus:** Set and display your primary goal for the day to maintain focus.
- **To-Do List:** A simple and effective to-do manager to track your tasks.
- **Local Persistence:** All your data is saved directly in your browser's local storage for privacy and speed.
- **Minimalist Design:** A clean, calming interface with a soft, animated gradient background to help you relax and concentrate.

## 🚀 Technology Stack

- **Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Date & Time:** date-fns
- **Deployment:** Cloudflare Workers

## 🛠️ Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/serenedash.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd serenedash
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

## 💻 Development

To run the application in development mode, use the following command. This will start a local server, typically on `http://localhost:3000`.

```sh
bun run dev
```

The application will automatically reload when you make changes to the source files.

## ☁️ Deployment

This project is configured for seamless deployment to Cloudflare Pages.

To deploy your application, simply run the deploy script:

```sh
bun run deploy
```

This command will build the application and deploy it using the Wrangler CLI.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[cloudflarebutton]