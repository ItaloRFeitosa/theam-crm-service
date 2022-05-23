provider "aws" {
  region                      = "us-east-1"
  access_key                  = "minioadmin"
  secret_key                  = "minioadmin"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true
  endpoints {
    s3 = "http://localhost:9000"
  }
}

resource "aws_s3_bucket" "crm_customers_bucket" {
  bucket = "crm-customers-bucket"
  
}

resource "aws_s3_bucket_acl" "crm_customers_bucket_acl" {
  bucket = aws_s3_bucket.crm_customers_bucket.id
  acl    = "private"
}