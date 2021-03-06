import { useContext } from "@nuxtjs/composition-api"
import { PagedRecipeFilter, RecipeFilter } from "~/types/filters"
import { Recipe } from "~/types/models"
import { PagedList, RecipeDetails, RecipeRow } from "~/types/queries"

export const useRecipe = () => {
  const { $axios } = useContext()

  const getRecipeRows = async (filter?: PagedRecipeFilter): Promise<PagedList<RecipeRow>> => {
    const response = await $axios.post<PagedList<RecipeRow>>('/recipelist/findallpaged', filter)
    return response.data
  }

  const getMyRecipeRows = async (filter?: PagedRecipeFilter): Promise<PagedList<RecipeRow>> => {
    const response = await $axios.post<PagedList<RecipeRow>>('/recipelist/myrecipespaged', filter)
    return response.data
  }

  const getRecipeDetails = async (id: string): Promise<RecipeDetails> => {
    const response = await $axios.get<RecipeDetails>(`/recipedetails/findbyid/${id}`)
    return response.data
  }

  const getMyRecipeDetails = async (id: string): Promise<RecipeDetails> => {
    const response = await $axios.get<RecipeDetails>(`/recipedetails/findMyRecipeByid/${id}`)
    return response.data
  }

  const createEmptyRecipe = async (): Promise<Recipe> => {
    const response = await $axios.post<Recipe>('/recipe/createEmpty', {})
    return response.data
  }

  const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const response = await $axios.put<Recipe>(`/recipe/${recipe.recipeId}`, recipe)
    return response.data
  }

  const deleteRecipe = async (id: string): Promise<void> => {
    const response = await $axios.delete<void>(`/recipe/delete/${id}`)
    return response.data
  }

  return {
    getRecipeRows,
    getMyRecipeRows,
    getRecipeDetails,
    getMyRecipeDetails,
    createEmptyRecipe,
    saveRecipe,
    deleteRecipe
  }
}

export default useRecipe
