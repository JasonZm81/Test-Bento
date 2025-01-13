const ProductCard: React.FC<ProductCardProps> = ({ onAddToBag }) => {
    const handleAddToBag = (quantity: number) => {
        // ... logic to determine quantity
        onAddToBag(quantity); // Call onAddToBag with the updated quantity
    };

    return (
        <button onClick={() => handleAddToBag(1)}>Add to Bag</button> // Example usage
    );
};
