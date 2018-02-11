select *
from users_sim3
where user_id != $1 and $2 = $3
order by last_name
  limit 24
  offset (($4 -1)*24);