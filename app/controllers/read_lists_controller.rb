class ReadListsController < ApplicationController
  before_action :set_read_list, only: [:show, :update, :destroy]

  # GET /read_lists
  def index
    @read_lists = ReadList.all

    render json: @read_lists
  end

  # GET /read_lists/1
  def show
    render json: @read_list
  end

  # POST /read_lists
  def create
    @read_list = ReadList.new(read_list_params)

    if @read_list.save
      render json: @read_list, status: :created, location: @read_list
    else
      render json: @read_list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /read_lists/1
  def update
    if @read_list.update(read_list_params)
      render json: @read_list
    else
      render json: @read_list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /read_lists/1
  def destroy
    @read_list.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_read_list
      @read_list = ReadList.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def read_list_params
      params.require(:read_list).permit(:user_id_id, :book_id_id, :rating, :read_status)
    end
end
