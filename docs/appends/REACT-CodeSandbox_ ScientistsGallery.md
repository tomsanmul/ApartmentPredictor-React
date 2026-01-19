# CodeSandbox ScientistsGallery

## Summary

todo

## ScientistsGallery v0: components

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

- Always use **function components**
  - `class` components are legacy now
- Almost always **destructure props**: `({ name, age }) => ...`
- **Always** put key when rendering lists from .`map()`
- Prefer fragments `<></>` over unnecessary <div>
- Component names **must** start with **Capital Letter**
- Current community preference (2025+): `function Component() {}` or `const Component = () => {}` — both are fine

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

## ScientistsGallery v1: conditional render

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

## ScientistsGallery v2: table and div

- https://codesandbox.io/p/sandbox/scientistsgallery2-myw4rz



**Table**

![](https://albertprofe.dev/images/ifcd0210-26/ScientistsGallery1.png)

**Div**

![](https://albertprofe.dev/images/ifcd0210-26/ScientistsGallery2.png)



**This line:**

```jsx
{person.name} {person.profession} {person.age}
```

is the **most common and basic way** to display several pieces of data from an object inside JSX.

```jsx
<div>
  {person.name}           {/* ← JavaScript expression: gets value of name */}
  {' '}                   {/* ← just a space (very frequent pattern) */}
  {person.profession}     {/* ← another value */}
  {' '}                   {/* ← another space */}
  {person.age}            {/* ← last value */}
</div>
```

Equivalent more readable versions (all do exactly the same thing)

```jsx
// 1. Classic & most common style (what you see in the code)
{person.name} {person.profession} {person.age}

// 2. With explicit spaces (very clear)
{person.name + " " + person.profession + " " + person.age}

// 3. Template literal (many people prefer this today)
{`${person.name} ${person.profession} ${person.age}`}

// 4. Inside a string with interpolation (also very popular)
{`${person.name} (${person.profession}, ${person.age} years)`}

// 5. With line breaks for readability (works perfectly)
{`
  ${person.name}
  ${person.profession}
  ${person.age} years old
`}
```

Real-world recommendation (what most experienced React devs do today)

```jsx
// Preferred modern style in most codebases
<div className="scientist-card">
  {person.name} <span className="profession">({person.profession})</span>, {person.age} years
</div>

// Or even cleaner:
<div className="scientist-card">
  {`${person.name} (${person.profession}, ${person.age} y/o)`}
</div>
```

**Bottom line:**

```jsx
{person.name} {person.profession} {person.age}
```

→ is just a **very short, very common way** of writing:

"Show the name, then a space, then the profession, then a space, then the age"

It's perfectly valid and you will see it **everywhere** in React code — especially in learning examples and quick prototypes.

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
  const scientistRows = people.map((person) => (
    <tr>
      <td> {person.name} </td>
      <td> {person.profession} </td>
      <td> {person.age} </td>
    </tr>
  ));
  return (
    <>
      <h1> Scientists Table</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Profession</th>
          <th>Age</th>
        </tr>
        {scientistRows}
      </table>
      <p> </p>
    </>
  );
}

function CardsScientistVisuals() {
  const scientistCards = people.map((person) => (
    <div style={{ background: "grey", margin: "6px", padding: "8px" }}>
      {" "}
      {person.name} {person.age} {person.profession}
    </div>
  ));

  return (
    <>
      <h1> Scientists Cards</h1>
      {scientistCards}
      <p> </p>
    </>
  );
}

function MyFooter() {
  ....
}

function ListRender(props) {
  ....
}

```

## ScientistsGallery v3: filter
