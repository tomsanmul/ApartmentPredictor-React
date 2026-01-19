# CodeSandbox ScientistsGallery

## Summary

todo

## ScientistsGallery v0

- [ScientistsGallery 0](https://codesandbox.io/p/sandbox/react-dev-forked-vgj2k2)

**Basic component**

```jsx
function Welcome() {
 return <h1>Hello React!</h1>;
}
```

**Component with props**

```jsx
function Greeting({ name }) {
  return <h2>Hi, {name}!</h2>;
}
```

**Most common list rendering pattern** 

you <mark>MUST</mark> remember this:

```jsx
const items = data.map(item => (
  <li key={item.id}>
    {item.title}
  </li>
));
```

**Passing props down**

```jsx
function App() {
  return (
    <>
      <Greeting name="Albert" />
      <ListRender profession="physicist" />
    </>
  );
}
```

Quick Tips / Best Practices (2025–2026 style):

- Always use **function components** (class components are legacy now)
- Almost always **destructure props**: ({ name, age }) => ...
- **Always** put key when rendering lists from .map()
- Prefer fragments <></> over unnecessary <div>
- Component names **must** start with **Capital Letter**
- Current community preference (2025+): function Component() {} or const Component = () => {} — both are fine

Code:

```jsx
import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

export default function ScientistsGallery() {
  const profession = "mathematician";
  return (
    <>
      <h1>Gallery of Famous Scientists </h1>
      <h2> Profession: {profession} </h2>

      <ListRender profession={profession} />
      <p></p>
      <MyFooter />
    </>
  );
}

function MyFooter() {
  return (
    <>
      <small>Copyright 2024 by React</small>
    </>
  );
}

function ListRender(props) {
  const professionToFilter = props.profession;
  const listToRender = people.filter(
    (person) => person.profession === professionToFilter
  );
  const listItems = listToRender.map((person) => (
    <li>
      <img src={getImageUrl(person)} alt={person.name} />
      <section>
        <p>
          <b>{person.name}:</b>
          {" " + person.profession + " "}
          known for {person.accomplishment}
        </p>
        <p>Age : {person.age} </p>
      </section>
    </li>
  ));
  return (
    <>
      <ul>{listItems}</ul>
    </>
  );
}
```

## ScientistsGallery v1

- [ScientistsGallery 0](https://codesandbox.io/p/sandbox/react-dev-forked-vgj2k2)

**Basic component with conditional render**

Early return (very clean and popular)

```jsx
function ScientistVisuals({ dataFormat, age }) {
  // Option 1: Early return (very clean and popular)
  if (dataFormat === "table") {
    return <TableScientistVisuals ageFilter={age} />;
  }

  if (dataFormat === "cards") {
    return <CardsScientistVisuals ageFilter={age} />;
  }

  // Fallback / default case
  return (
    <div style={{ color: '#e74c3c', fontStyle: 'italic' }}>
      Unknown display format: "{dataFormat}"
    </div>
  );
}
```

Code:

```jsx
import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

export default function ScientistsGallery() {
  const profession = "mathematician";
  const dataFormat = "table";
  const age = 50;

  return (
    <>
      <h1>Gallery of Famous Scientists </h1>
      <h2> Profession: {profession} </h2>

      <ListRender profession={profession} />
      <p></p>

      <ScientistVisuals dataFormat={dataFormat} age={age} />

      <MyFooter />
    </>
  );
}

function ScientistVisuals(props) {
  const condition = props.dataFormat;
  const age = props.age;

  if (condition === "table") return <TableScientistVisuals />;
  else return <CardsScientistVisuals />;
}

function TableScientistVisuals() {
  .....
}

function CardsScientistVisuals() {
  ....
}

function MyFooter() {
 .....
}

function ListRender(props) {
  ...
}
```

Quick Tips / Best Practices (2025–2026 style):

- Prefer **early returns** when logic is non-trivial
- Use **object lookup** when you have many display variants (very clean & scalable)
- Keep ternaries for simple **show/hide** or **two-state** cases
- Avoid long ternary chains — they become hard to read/maintain very quickly



```jsx
// Style 4: Object lookup / component map (very clean for many variants)
const formatComponents = {
  table: TableScientistVisuals,
  cards: CardsScientistVisuals,
  compact: CompactScientistVisuals,
};

function ScientistVisualsBest({ dataFormat, ...rest }) {
  const Component = formatComponents[dataFormat] || DefaultFallback;

  return <Component {...rest} />;
}

function DefaultFallback() {
  return <div style={{ padding: '2rem', background: '#ffecec' }}>
    No valid visualization format selected.
  </div>;
}
```

## ScientistsGallery v2
