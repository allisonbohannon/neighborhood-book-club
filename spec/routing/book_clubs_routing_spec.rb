require "rails_helper"

RSpec.describe BookClubsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/book_clubs").to route_to("book_clubs#index")
    end

    it "routes to #show" do
      expect(get: "/book_clubs/1").to route_to("book_clubs#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/book_clubs").to route_to("book_clubs#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/book_clubs/1").to route_to("book_clubs#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/book_clubs/1").to route_to("book_clubs#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/book_clubs/1").to route_to("book_clubs#destroy", id: "1")
    end
  end
end
