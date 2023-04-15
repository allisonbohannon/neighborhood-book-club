require "rails_helper"

RSpec.describe BookClubMembersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/book_club_members").to route_to("book_club_members#index")
    end

    it "routes to #show" do
      expect(get: "/book_club_members/1").to route_to("book_club_members#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/book_club_members").to route_to("book_club_members#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/book_club_members/1").to route_to("book_club_members#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/book_club_members/1").to route_to("book_club_members#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/book_club_members/1").to route_to("book_club_members#destroy", id: "1")
    end
  end
end
