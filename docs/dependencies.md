# Project Dependencies Overview

Documentation for the main dependencies of the Wildhaven-website project. All information is validated via Context7 (current examples, descriptions, links).

---

## 1. @heroicons/react

- **Purpose:** React components for Heroicons SVG icons.
- **Installation:**
  ```bash
  npm install @heroicons/react
  ```
- **Usage:**
  ```jsx
  import { BeakerIcon } from "@heroicons/react/24/solid";
  function MyComponent() {
    return <BeakerIcon className="size-6 text-blue-500" />;
  }
  ```
- **Documentation:** [Heroicons GitHub](https://github.com/tailwindlabs/heroicons)

---

## 2. @modelcontextprotocol/sdk

- **Purpose:** SDK for Model Context Protocol, enabling AI workflow integration and external MCP server connectivity.
- **Example configuration:**
  ```json
  {
    "mcpServers": {
      "context7": {
        "command": "npx",
        "args": ["-y", "@upstash/context7-mcp"]
      }
    }
  }
  ```
- **Documentation:** [GitHub](https://github.com/ppl-ai/modelcontextprotocol)

---

## 3. @supabase/supabase-js

- **Purpose:** Official JavaScript SDK for Supabase — an open-source Firebase alternative. Enables working with a Postgres database, authentication, file storage, and real-time events.
- **Installation:**
  ```bash
  npm install @supabase/supabase-js
  ```
- **Client initialization:**
  ```js
  import { createClient } from "@supabase/supabase-js";
  const supabase = createClient(
    "https://your-project.supabase.co",
    "public-anon-key"
  );
  ```
- **Example: Fetching data from a table**
  ```js
  const { data, error } = await supabase.from("countries").select("id, name");
  ```
- **Example: Subscribing to table changes**
  ```js
  const channel = supabase
    .channel("schema-db-changes")
    .on("postgres_changes", { event: "INSERT", schema: "public" }, (payload) =>
      console.log(payload)
    )
    .subscribe();
  ```
- **Example: Getting a public file URL**
  ```js
  const { data } = supabase.storage.from("bucket").getPublicUrl("filePath.jpg");
  console.log(data.publicUrl);
  ```
- **Features:**
  - Full Postgres support (CRUD, filtering, sorting)
  - Real-time subscriptions to database changes
  - User authentication (email, social, PKCE, JWT)
  - File storage and management (Storage API)
  - Auto-generated REST and GraphQL APIs
  - Row Level Security (RLS) support
- **Documentation:** [Supabase Docs](https://supabase.com/docs/reference/javascript)

---

## 4. date-fns

- **Purpose:** Modern JavaScript date utility library for parsing, formatting, and manipulating dates.
- **Installation:**
  ```bash
  npm install date-fns
  ```
- **Usage:**
  ```js
  import { format, addDays } from "date-fns";
  const today = new Date();
  const tomorrow = addDays(today, 1);
  console.log(format(tomorrow, "yyyy-MM-dd"));
  ```
- **Documentation:** [date-fns Docs](https://date-fns.org/docs/Getting-Started)

---

## 5. mcp-shrimp-task-manager

- **Purpose:** Task management tool for AI agents, supporting planning, analysis, reflection, research, task splitting, status control, and workflow automation.
- **Features:**
  - Task planning and analysis (plan_task, analyze_task)
  - Solution reflection and improvement (reflect_task)
  - Research mode (research_mode)
  - Project standards management (init_project_rules)
  - Task splitting (split_tasks)
  - Task execution and verification (execute_task, verify_task)
- **Documentation:** [GitHub](https://github.com/cjo4m06/mcp-shrimp-task-manager)

---

## 6. next (Next.js)

- **Purpose:** React framework for server-side rendering (SSR), static site generation (SSG), API routes, and advanced routing.
- **Installation:**
  ```bash
  npm install next react react-dom
  ```
- **Features:**
  - File-based routing
  - SSR and SSG support
  - API routes for backend logic
  - Built-in CSS and CSS-in-JS support
  - Image optimization
- **Documentation:** [Next.js Docs](https://nextjs.org/docs)

---

## 7. next-auth

- **Purpose:** Authentication solution for Next.js applications, supporting multiple providers (OAuth, email, credentials).
- **Installation:**
  ```bash
  npm install next-auth
  ```
- **Features:**
  - OAuth, email, and custom credentials providers
  - JWT and session-based authentication
  - Secure, extensible, and easy to configure
- **Documentation:** [NextAuth.js Docs](https://next-auth.js.org/getting-started/introduction)

---

## 8. react

- **Purpose:** Core library for building user interfaces with components and hooks.
- **Installation:**
  ```bash
  npm install react
  ```
- **Features:**
  - Declarative UI
  - Component-based architecture
  - State and effect management with hooks
- **Documentation:** [React Docs](https://react.dev/learn)

---

## 9. react-dom

- **Purpose:** React package for DOM rendering and hydration, enabling React apps to run in the browser.
- **Installation:**
  ```bash
  npm install react-dom
  ```
- **Features:**
  - DOM rendering for React components
  - Server-side rendering (SSR) hydration
- **Documentation:** [React DOM Docs](https://react.dev/reference/react-dom)

---

## 10. react-day-picker

- **Purpose:** Flexible date picker component for React, supporting customization and accessibility.
- **Installation:**
  ```bash
  npm install react-day-picker
  ```
- **Usage:**
  ```jsx
  import { DayPicker } from "react-day-picker";
  <DayPicker selected={selectedDate} onSelect={setSelectedDate} />;
  ```
- **Documentation:** [React Day Picker Docs](https://react-day-picker.js.org/)

---

## 12. @headlessui/react

- **Purpose:** Unstyled, fully accessible UI components for React, designed to integrate seamlessly with Tailwind CSS.
- **Installation:**
  ```bash
  npm install @headlessui/react
  ```
- **Usage Example:**

  ```jsx
  import { Menu } from "@headlessui/react";

  function MyDropdown() {
    return (
      <Menu>
        <Menu.Button>More</Menu.Button>
        <Menu.Items>
          <Menu.Item>
            <a
              className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
              href="/account-settings"
            >
              Account settings
            </a>
          </Menu.Item>
          {/* ... */}
        </Menu.Items>
      </Menu>
    );
  }
  ```

- **Tailwind CSS Integration:**
  - Works out of the box with Tailwind CSS utility classes.
  - Supports `@headlessui/tailwindcss` plugin for advanced state-based styling (e.g., `ui-active`, `ui-not-active`).
  - Example Tailwind config:
    ```js
    // tailwind.config.js
    module.exports = {
      plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
    };
    ```
- **Accessibility:**
  - All components are built with accessibility best practices.
  - Keyboard navigation and ARIA attributes are handled automatically.
- **Documentation:** [Headless UI GitHub](https://github.com/tailwindlabs/headlessui)

---

## 13. tailwindcss

- **Purpose:** Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It scans your HTML for class names and generates corresponding static CSS, offering a fast, flexible, and zero-runtime styling solution.
- **Installation:**
  ```bash
  npm install tailwindcss
  npx tailwindcss init
  ```
- **Basic Configuration Example:**
  ```js
  // tailwind.config.js
  module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```
- **Usage Example:**
  ```html
  <button
    class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
  >
    Button
  </button>
  ```
- **Best Practices:**
  - Use the `content` array in your config to include all template files for purging unused styles.
  - Leverage utility classes for rapid prototyping and consistent design.
  - Extend the default theme for custom colors, spacing, and breakpoints as needed.
  - Use plugins like `@tailwindcss/forms` for enhanced form styling.
- **Documentation:** [Tailwind CSS Docs](https://tailwindcss.com/docs)
