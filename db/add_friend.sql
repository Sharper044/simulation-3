insert into friends
( relation_type, primary_person_id, secondary_person_id )
values
( 'friend', $1, $2 );

select secondary_person_id
from friends
where primary_person_id = $1 and relation_type = 'friend';