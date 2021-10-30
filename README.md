# Performace - ReactJS

 Funcionamento ReactJS:
  - Criar uma nova versão do componente
  - Comparar com a versão anterior
  - Se houverem alterações, vai atualizar o que alterou

# Key

Arr [1,2,3,4,5] = usar key para não dar problemas de performace.
não pode ser o index e ser unico.
 # Memo

   - Pure Functional Components
  -  Renders too often
 - Re-renders with same props
  - Medium to big size

```js
import { memo } from "react";

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
```
 

#  useMemo / useCallback
  
  - Cálculos pesados
  - Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
  - useCallback é para tratar igualdade referencial e não duplicar o item em memoria.

useMemoExample:

```js
import { useState, useMemo } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};


```
useCallbackExample: 

```js
 const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, []);
```

# Formatação de dados:

- na maioria das vezes fazer a tratativa dos dados durante a chamada a api.

```js

 const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

 const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total, result) => {
      return total + result.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

```

# Dynamic import (code Splitting)

- ajuda a diminir bundle
- se o component precisa de alguma lib ou importação e não aparece muito em tela podemos usar Dynamic
- import dynamic from "next/dynamic" (nextjs) || import {lazy} from "react" (reactjs).
- carregar apenas quando precisarmos da função ou component.

```js
import dynamic from "next/dynamic";


const AddProductToWishList = dynamic<AddToWishListProps>(
  () => {
    return import("./AddProductToWishList").then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

```

# Virtualização

- react-virtualized
- utilizado em grandes listas
- import {List, AutoSizer} from "react-virtualized"
- Efeito de carregamento aos poucos

```js
import { List, ListRowRenderer } from "react-virtualized";


  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} addToWishList={addToWishList} />
      </div>
    );
  };

  return (
    <div>
      <h1>{totalPrice}</h1>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}
```
# Bundle Analyzer

- entender os problemas na nossa apresentação.
- yarn add @next/bundle-analyzer
- criar next.config.js
- ANALYZE=true yarn build

```js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
}

```
