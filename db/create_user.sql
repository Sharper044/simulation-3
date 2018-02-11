insert into users_sim3 
( auth0_id, first_name, last_name )
values 
($1, $2, $3)
returning *;