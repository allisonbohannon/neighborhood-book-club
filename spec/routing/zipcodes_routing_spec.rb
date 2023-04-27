require "rails_helper"

RSpec.describe ZipcodesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/zipcodes").to route_to("zipcodes#index")
    end

    it "routes to #show" do
      expect(get: "/zipcodes/1").to route_to("zipcodes#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/zipcodes").to route_to("zipcodes#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/zipcodes/1").to route_to("zipcodes#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/zipcodes/1").to route_to("zipcodes#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/zipcodes/1").to route_to("zipcodes#destroy", id: "1")
    end
  end
end
