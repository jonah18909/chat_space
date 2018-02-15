FactoryBot.define do
  factory :message do
    text Faker::Lorem.sentence
    image Rack::Test::UploadedFile.new(File.join(Rails.root, "spec/fixtures/image/image.jpg"))
    user
    group
  end
end
