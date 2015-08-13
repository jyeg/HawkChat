class IngredientsController < ApplicationController
  def index
    @ingredients = Ingredient.select("id, item").order("item ASC").to_json
  end

  def update
    ingredient = Ingredient.find(params[:id])
    ingredient.item = params[:item]
    ingredient.save!
    render :nothing => true, :status => 200
  end

  def destroy
    ingredient = Ingredient.find(params[:id])
    ingredient.destroy
    render :nothing => true, :status => 200
  end
end
