select *
from users_sim3
where user_id != $1
order by last_name
  limit 24
  offset (($2 -1)*24);