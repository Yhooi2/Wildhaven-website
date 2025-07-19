function PriceDisplay({ regularPrice, discount, nightlyPrice }) {
  return (
    <p className="flex items-baseline gap-2">
      {discount > 0 ? (
        <>
          <span className="text-2xl">${nightlyPrice}</span>
          <span className="font-semibold text-primary-700 line-through">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-2xl">${regularPrice}</span>
      )}
      <span>/night</span>
    </p>
  );
}

export default PriceDisplay;
