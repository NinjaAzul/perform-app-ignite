import React, { memo, useState } from "react";
import { AddToWishListProps } from "./AddProductToWishList";
import dynamic from "next/dynamic";
import lodash from "lodash";

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

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  addToWishList: (id: number) => void;
};

function ProductItemComponent({ product, addToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => addToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);