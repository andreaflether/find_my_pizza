json.id @store.id
json.lonlat @store.lonlat
json.name @store.name
json.address @store.address 
json.google_place_id @store.google_place_id

json.ratings @store.ratings do |rating| 
  json.value rating.value 
  json.opinion rating.opinion 
  json.user_name rating.user_name 
  json.created_at rating.created_at.strftime("%d/%m/%Y %H:%M")
end 

json.total_ratings @store.ratings.count
json.rating_average @store.rating_average

