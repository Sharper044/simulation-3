select *
from users_sim3
where user_id in (select DISTINCT us3.user_id
                from users_sim3 as us3
                full outer join friends as f
                on us3.user_id = f.secondary_person_id
                where us3.$2 = $3 and (f.relation_type ISNULL or f.primary_person_id != $1) and us3.user_id != $1
                order by us3.user_id
                  limit 24
                  offset (($4 -1)*24));