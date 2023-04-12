require "rails_helper"

RSpec.describe ReadListsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/read_lists").to route_to("read_lists#index")
    end

    it "routes to #show" do
      expect(get: "/read_lists/1").to route_to("read_lists#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/read_lists").to route_to("read_lists#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/read_lists/1").to route_to("read_lists#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/read_lists/1").to route_to("read_lists#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/read_lists/1").to route_to("read_lists#destroy", id: "1")
    end
  end
end
