# Test Coverage Goals & Scope

## Primary Goals
1.  **Critical User Flows**: Verify the core value propositions of the application (e.g., Search, Navigation).
2.  **Cross-Browser Compatibility**: Ensure functionality across Chrome, Firefox, and Safari (Desktop & Mobile).
3.  **Stability**: Zero flakiness through smart waits and auto-retries.

## Scope
### In Scope
- **YouTube Home Page**:
    - Title Verification.
    - Search Input Visibility & Interaction.
- **Responsiveness**:
    - Mobile Viewport verification.

### Out of Scope
- Third-party ad verification.
- Video playback quality metrics (functional playback start only).

## Coverage Measurement
Tests are instrumented with `[Coverage]` logs to trace execution paths against these goals.
