# Chat-Space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|text|null: false, unique: true|
### Association
- has_many: :groups, through: :groups_users
- has_many: :messages 
### Index
- add_index :users: :name

###

## groupesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many: :users, through: :groups_users
- has_many: :messages

###

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foriegin_key: true|
|user_id|integer|null: false, foriegin_key: true|
### Association
- belongs_to :group
- belongs_to :user

###

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foriegin_key: true |
|user_id|integer|null: false, foriegin_key: true|
### Association
- belongs_to :group
- belongs_to :user