# ClaimFinder Testing Strategy

This document outlines the testing strategy for the ClaimFinder project.

## Test Organization

The project has two types of tests:

1. **Unit Tests** - Using Bun's built-in test framework
2. **E2E Tests** - Using Playwright

### Project Standard: Adjacent Test Files (Co-location)

For this project, we've adopted the adjacent test files pattern (co-location). Test files are kept next to their implementation files, making it easy to find tests related to specific components or functionality.

```
src/
├── utils/
│   ├── validations.ts
│   ├── validations.test.ts
├── store/
│   ├── useCounterStore.ts
│   ├── useCounterStore.test.ts
```

#### Benefits of This Approach:

- **Discoverability**: Tests are easy to find when looking at implementation files
- **Proximity**: Changes to implementation can be immediately reflected in tests
- **Completeness**: Encourages test coverage by making missing tests obvious
- **Context**: Understanding tests with full context of the implementation

### E2E Tests

End-to-end tests are maintained separately in the `e2e-tests` directory, following Playwright conventions.

## Test File Naming Conventions

- Unit/Integration tests: `*.test.ts` or `*.test.tsx`
- E2E tests: `*.spec.ts` (Playwright convention)

## Running Tests

- Unit tests: `bun test`
- E2E tests: `bun run test:e2e` or `bun run test:e2e:ui`

## Best Practices

1. **Test Coverage**: Aim for comprehensive test coverage, especially for core business logic
2. **Isolation**: Tests should be isolated and not depend on other tests
3. **Meaningful Names**: Use descriptive test names that explain the expected behavior
4. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification phases
5. **Mock External Dependencies**: Use mocks for external dependencies to ensure tests are reliable

## CI/CD Integration

Tests are automatically run as part of the CI/CD workflow:
- Unit tests run on every PR
- E2E tests gate production deployments from the 'main' branch

## Future Considerations

As the test suite grows, consider:
1. Introducing component testing with a tool like Testing Library
2. Adding API integration tests
3. Implementing visual regression testing
