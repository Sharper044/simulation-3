delete from friends
where primary_person_id = $1 and secondary_person_id = $2;

select secondary_person_id
from friends
where primary_person_id = $1 and relation_type = 'friend';