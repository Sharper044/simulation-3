select 
  case 
    when (count(*)-1)%24 = 0 
    then ((count(*)-1)/24) 
    else (((count(*)-1)/24)+1) 
    end as page_count,
  case
    when (count(*)-(($1-1)*24)) < 24
    then (count(*)-(($1-1)*24))
    else 24
    end as user_count
from users_sim3;