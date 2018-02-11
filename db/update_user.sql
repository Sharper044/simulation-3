update users_sim3
set first_name = $2,
last_name = $3,
gender = $4,
hair_color = $5,
eye_color = $6,
hobby = $7,
birthday_day = $8,
birthday_month = $9,
birthday_year = $10
where user_id = $1;

select *
from users_sim3
where user_id = $1;