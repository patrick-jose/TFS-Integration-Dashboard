# Docker image
FROM nginx

# Set environmet variable
ENV TFS_INTEGRATION_API="http://localhost:9090"

# Copy app source from host into container
COPY dist /usr/share/nginx/html
