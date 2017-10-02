update quill 
set body = $1 
where id = $2
returning quill