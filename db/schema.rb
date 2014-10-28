# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20141028044317) do

  create_table "brands", :force => true do |t|
    t.string   "title"
    t.string   "description"
    t.datetime "created_at",                                 :null => false
    t.datetime "updated_at",                                 :null => false
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.datetime "logo_updated_at"
    t.string   "url"
    t.string   "name"
    t.string   "image_promo_file_name"
    t.string   "image_promo_content_type"
    t.integer  "image_promo_file_size"
    t.datetime "image_promo_updated_at"
    t.text     "warranty"
    t.boolean  "is_published",             :default => true
  end

  create_table "carts", :force => true do |t|
    t.string   "cookie_id"
    t.string   "data"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.string   "weight"
    t.string   "picture_thumb_file_name"
    t.string   "picture_thumb_content_type"
    t.integer  "picture_thumb_file_size"
    t.datetime "picture_thumb_updated_at"
    t.string   "picture_large_file_name"
    t.string   "picture_large_content_type"
    t.integer  "picture_large_file_size"
    t.datetime "picture_large_updated_at"
    t.string   "short_name"
  end

  create_table "comments", :force => true do |t|
    t.integer  "survey_user_id"
    t.integer  "item_id"
    t.string   "text"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "items", :force => true do |t|
    t.string   "title"
    t.string   "title_original"
    t.text     "desc"
    t.text     "desc_original"
    t.string   "meta"
    t.integer  "price"
    t.integer  "price_original"
    t.integer  "price_special"
    t.string   "link_to_original_item"
    t.datetime "created_at",                                  :null => false
    t.datetime "updated_at",                                  :null => false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "picture2_file_name"
    t.string   "picture2_content_type"
    t.integer  "picture2_file_size"
    t.datetime "picture2_updated_at"
    t.string   "picture3_file_name"
    t.string   "picture3_content_type"
    t.integer  "picture3_file_size"
    t.datetime "picture3_updated_at"
    t.string   "picture4_file_name"
    t.string   "picture4_content_type"
    t.integer  "picture4_file_size"
    t.datetime "picture4_updated_at"
    t.string   "picture5_file_name"
    t.string   "picture5_content_type"
    t.integer  "picture5_file_size"
    t.datetime "picture5_updated_at"
    t.string   "url"
    t.integer  "category_id"
    t.boolean  "is_published",          :default => true
    t.integer  "brand_id"
    t.string   "gender",                :default => "unisex"
    t.text     "facts"
  end

  create_table "subcategories", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  create_table "survey_users", :force => true do |t|
    t.string   "name"
    t.string   "code"
    t.text     "data",          :limit => 255
    t.datetime "created_at",                                     :null => false
    t.datetime "updated_at",                                     :null => false
    t.integer  "current_index",                :default => 0
    t.text     "data_liked",    :limit => 255, :default => "[]"
    t.text     "data_best",     :limit => 255, :default => "[]"
    t.string   "gender"
  end

end
