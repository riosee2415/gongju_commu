# BOARD

1. BOARD LIST

- URL : /board/list
- METHOD : GET

2. BOARD DETAIL[x]

- URL : /board/list/:boardId
- METHOD : GET

3. BOARD CREATE[x]

- URL : /board/create
- METHOD : GET, POST
- body : { title, content, createdAt, UserId }

4. BOARD UPDATE

- URL : /board/update
- METHOD : GET, POST
- body : { id, title, content }

5. BOARD DELETE

- URL : /board/delete
- METHOD : POST
- body : { boardId }

BOARD LIST PAGE
BOARD DETAIL PAGE
BOARD CREATE PAGE (생긴게 동일함)
BOARD UPDATE PAGE (생긴게 동일함)
