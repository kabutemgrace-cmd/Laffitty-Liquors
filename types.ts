
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RecommendationResponse {
  recommendation: string;
  suggestedProduct: string;
  reasoning: string;
  vibe: string;
}
