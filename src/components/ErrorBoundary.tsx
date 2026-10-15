/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, type ReactNode } from "react";
import { BRAND_INFO, GOOGLE_MAPS_URL } from "../constants";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Last line of defence: if rendering throws, show the restaurant's essentials and a reload
 * button instead of an empty page. Bilingual because the language state lives inside the
 * tree that failed.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // The project has no @types/react, so `Component` is untyped: declare what this class relies on.
  declare props: ErrorBoundaryProps;
  state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main role="alert" className="flex min-h-screen items-center justify-center bg-bg-cream px-6 py-16 text-center">
        <div className="max-w-md">
          <p className="font-serif text-3xl font-bold text-primary">{BRAND_INFO.name}</p>
          <p className="mt-4 text-text-dark/80">Something went wrong while loading this page.</p>
          <p className="text-text-dark/80">Đã có lỗi khi tải trang.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-accent-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
          >
            Reload · Tải lại
          </button>
          <p className="mt-8 text-sm leading-relaxed text-text-dark/80">
            <a href={`tel:${BRAND_INFO.phoneTel}`} className="font-semibold text-primary underline underline-offset-4">
              {BRAND_INFO.phone}
            </a>
            <br />
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
              {BRAND_INFO.address}
            </a>
          </p>
        </div>
      </main>
    );
  }
}
