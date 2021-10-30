import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  addToWishList: (id: number) => void;
  totalPrice: number;
};

export function SearchResults({
  results,
  totalPrice,
  addToWishList,
}: SearchResultsProps) {
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