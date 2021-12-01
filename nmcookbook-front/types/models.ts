export interface Recipe {
  recipeId?: string
  title: string
  description: string
  preparatioSteps: string
  preparationTime: number
  difficultyLevel: number
  image: string
}

export interface Ingredient {
  ingredientId?: string
  recipeId: string
  articleId: string
  unitId: string
  quantity: number
}

export interface Article {
  articleId?: string
  articleName: string
  description: string
  alcoholVolume: number
}

export interface Unit {
  unitId?: string
  symbol: string
}

export interface Category {
  categoryId?: string
  name: string
}

export interface Rating {
  ratingId?: string
  recipeId: string
  userId: string
  rating: number
  comment: string
}
