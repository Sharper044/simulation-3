select secondary_person_id
from friends
where primary_person_id = $1 and relation_type = 'friend';