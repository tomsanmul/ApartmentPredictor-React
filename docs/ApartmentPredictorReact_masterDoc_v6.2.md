# ApartmentPredictor-React masterDoc v6.2

## Summary

### Version Goal

Schools map and assign new school to an apartment

### References

- Server (BackEnd):
  
  - [GitHub - AlbertProfe/ApartmentPredictor](https://github.com/AlbertProfe/ApartmentPredictor)
  - [Create JAR from backend Spring Boot](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/appends/DATA-create-JAR.md)

- CodeSandbox:
  
  - [Traffic Lights](https://codesandbox.io/p/sandbox/7f8ffd) / [Scientists Gallery 5](https://codesandbox.io/p/devbox/scientistsgallery4-forked-94z8k7)
  - Praga-CRUD: [1](https://codesandbox.io/p/devbox/react-dev-forked-cmrdn2) - [2](https://codesandbox.io/p/devbox/task-crud-forked-9dxyd5?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [3](https://codesandbox.io/p/devbox/task-crud-2-forked-l72dzj?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [4](https://codesandbox.io/p/sandbox/imagelarge-context-1-46rlf4)  / [imageSizeContext](https://codesandbox.io/p/sandbox/wjylz5)

- React:
  
  - [Describing the UI](https://react.dev/learn/describing-the-ui) / [Adding Interactivity](https://react.dev/learn/adding-interactivity) / [Managing the state](https://react.dev/learn/managing-state)
  - [Custom Hooks](https://albertprofe.dev/reactjs/reactjs-hook-custom.html) / [useEffect](https://albertprofe.dev/reactjs/reactjs-hook-effect.html) / [useState](https://albertprofe.dev/reactjs/reactjs-hook-state.html) / [useReducer](https://albertprofe.dev/reactjs/reactjs-hook-reducer.html) / [useContext](https://albertprofe.dev/reactjs/reactjs-hook-context.html)

- Labs:
  
  - [Lab#RE07-1: traffic lights simulation](https://albertprofe.dev/reactjs/rjslab7-1.html)
  - [Lab#RE01-1: API Rest Axios](https://albertprofe.dev/reactjs/rjslab1.html)
  - [Lab#RE06-1: healthyFood Restaurant](https://albertprofe.dev/reactjs/rjslab6-1.html)
  - Middleware & Navigation:
    - **mathsWeb**: [mathsWeb: repo](https://github.com/AlbertProfe/mathsWeb) /  [mathsWeb: deployed](https://mathswebspace.netlify.app/)
    - **userBorrowBook**: [GitHub - AlbertProfe/userBorrowBookFront](https://github.com/AlbertProfe/userBorrowBookFront/tree/master)

### Project Structure

```textile
[Fri Mar 20 07:53:49] albert@albert-VirtualBox:~/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src (master)
$ tree
.
├── apartment
│   ├── ApartmentCreate.jsx
│   ├── ApartmentCRUD.jsx
│   ├── ApartmentDetail.jsx
│   ├── ApartmentItem.jsx
│   ├── ApartmentListContainer.jsx
│   ├── ApartmentList.jsx
│   ├── ApartmentReviewSummary.jsx
│   ├── ApartmentUpdate.jsx
│   └── filter
│       └── ApartmentFilter.jsx
├── App.css
├── App.jsx
├── assets
│   └── apartmentNewYork.jpg
├── auth
├── components
│   └── ApartmentForm.jsx
├── data
│   └── useApartments.jsx
├── hooks
├── index.css
├── layout
├── main.jsx
├── middleware
│   ├── apartmentApiService.js
│   ├── apartmentServiceHooks.jsx
│   └── apartmentService.jsx
├── navigation
│   ├── NavigationList.jsx
│   └── SideBar.jsx
├── pages
│   ├── ApartmentFilterPage.jsx
│   ├── ApartmentPage.jsx
│   └── HomePage.jsx
└── review
    └── Reviews.jsx

13 directories, 25 files

.
```
