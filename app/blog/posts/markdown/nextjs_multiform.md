---
title: "Setup Multiform in nextJS"
date: "2024-10-25"
description: "Learn how to create a multi-step form in Next.js, complete with structured steps and smooth navigation between each phase. This guide provides a simple setup without specific styling, allowing you to customize the design and functionality to fit your project needs."
author: "Shivam jain"
imageLink: "https://images.pexels.com/photos/28097263/pexels-photo-28097263/free-photo-of-water-texture-abstract-oil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
---

### How to Create a Multi-Step Form in Next.js

Creating a multi-step form in Next.js can help streamline the data collection process by breaking it down into simpler, manageable sections. This tutorial will guide you through setting up a multi-step onboarding form without relying on any specific CSS framework or styling, allowing you to customize it according to your needs.

### Step 1: Set Up the Directory Structure

1. **Create an `onboarding` folder** in your `app` directory. This folder will serve as the base for your multi-step form and will be accessible at `/onboarding`.

   ```
   /app
     └── /onboarding
         ├── layout.tsx
         ├── /bio
         │     └── page.tsx
         ├── /isOrg
         │     └── page.tsx
         └── ...other steps
   ```

2. **Create subfolders for each step** within the `onboarding` folder. For example, create folders named `/bio`, `/isOrg`, etc. Each of these folders will contain a `page.tsx` file representing a form step.

### Step 2: Create the Layout Component

In the `onboarding` folder, create a `layout.tsx` file to provide a consistent layout for each form step. Here’s a simple layout component:

```tsx
// /app/onboarding/layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Let's set up your profile</h1>
      {children}
    </div>
  );
}
```

### Step 3: Create the Form Steps

For each step in the onboarding process, create a `page.tsx` file in its respective folder. Below is an example for the **Bio** step.

#### Bio Step

```tsx
// /app/onboarding/bio/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BioPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle form submission logic (e.g., send data to an API)

    // Redirect to the next step
    router.push('/onboarding/isOrg');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
```

#### Organization Step

Next, create the **Is Organization** step similarly:

```tsx
// /app/onboarding/isOrg/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IsOrgPage() {
  const [isOrg, setIsOrg] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle form submission logic (e.g., send data to an API)

    // Redirect to the next step or finish the onboarding
    // router.push('/onboarding/nextStep'); // or whatever your next step is
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Are you an organization?
          <select value={isOrg ? 'yes' : 'no'} onChange={(e) => setIsOrg(e.target.value === 'yes')}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
```

### Step 4: Handling Navigation Between Steps

Each form step should redirect to the next step using the Next.js router. Make sure to implement your form logic in each `page.tsx` file and utilize `router.push()` to navigate between steps.


> You can enhance this by using global state management like reocil for pages router and jotai for app router ! Or even Zustand ! Your tools , your choice !

### Conclusion

This guide provides a basic framework for creating a multi-step form in Next.js without relying on specific styling or UI libraries. You can expand this setup by adding more steps and customizing the components to fit your design needs. Feel free to enhance the form with validation, error handling, and styling to improve the user experience!


