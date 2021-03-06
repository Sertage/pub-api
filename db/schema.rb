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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161126153221) do

  create_table "servers", force: :cascade do |t|
    t.string   "name",       limit: 80,                null: false
    t.boolean  "active",                default: true, null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.index ["name"], name: "index_servers_on_name", unique: true
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "name",       limit: 30,                 null: false
    t.string   "path",       limit: 255,                null: false
    t.datetime "start_at",                              null: false
    t.datetime "end_at",                                null: false
    t.string   "days",       limit: 15,                 null: false
    t.time     "hour",                                  null: false
    t.integer  "server_id",                             null: false
    t.boolean  "active",                 default: true, null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.index ["name"], name: "index_tasks_on_name"
    t.index ["server_id"], name: "index_tasks_on_server_id"
    t.index ["start_at", "end_at"], name: "index_tasks_on_start_at_and_end_at"
  end

end
