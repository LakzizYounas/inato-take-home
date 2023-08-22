# How to use

## 1. Install

```
npm i
```


## 2. Run

### API

```
nx serve customer-success-api
```
You can now get the ongoing trials running:
```
curl localhost:8080/clinical-trials/ongoing?country=FR&sponsor=sanofi
```


### CLI

```
nx execute customer-success-cli --country=FR
```

### Tests

```
nx test clinical-trials
```

# Code Discover Advice

In this repository there is only one bounded countext `clinical-trials` which contains only one usecase `get-ongoing-trials`.

The easiest way to review the code is probably to start with `libs/contexts/clinical-trials/src/use-cases/get-ongoing-trials/application/query/get-ongoing-trials.unit.test.ts` and then follow the flow.



# Technical Choices

## Nx monorepo

- Keep a good separation of concerns by segragating the bounded contexts into the `libs` and the applications into the `apps`.
- Good reusability of the code thanks to the libraries eg: the `clinical-trials` lib is used by the 2 applications.
- Good developer experience thanks to the NX features like caches, runs only modified code...


## Clean Architecture

Separates business logic, application logic and infrastructure to reduce accidental complexity and increase testability.


## Vertical slice architecture

- The clean architecture horizontal slices (application, infra) only appears in the `use-cases` folder to keep a strong segregation of responsibilities.
- But domain invariants stays scopes in the `clinical-trial` bounded context because they are use-case agnostic.
- This folder structure achieves to be a "screaming architecture".


## CQRS

- Not much value here, but in a real world application, the separation of queries and commands allows to be way faster on the read side than the write side.
- With Inato being a marketplace for clinical trials, I can certainly see how it could improve speed performance.


## Value object in Query

- Allows the domain to receive only valid data.
- Fail fast if an error occurs.


## Testing strategy

- TDD Outside-in from the handlers: main behaviors of the system are tested here
- Value object:
  - tested for the trivial checks like case sensitively
  - tested as scaffold help for some behaviors that will be tested by the handlers (eg: Trial.isOngoing)
- Infrastructure concerns are tested in integration tests, these are slower than the unit tests but they validate that the system communicates properly with the external world


## Unit & intégration tests segregation 

- Use of an file extension convention for tests (.unit.test, .it.test) to separate slow test and fast test. This allows us to run continuously our fast unit tests in watch mode and run slow integration tests when needed.


## Next steps

- Error handling: Domain Errors, Technical Errors
- Doc => swagger ?
- Commands to run only unit tests or only integration tests
