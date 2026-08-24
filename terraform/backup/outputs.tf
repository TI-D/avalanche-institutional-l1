output "bucket_arn" { value = aws_s3_bucket.backup.arn }
output "bucket_name" { value = aws_s3_bucket.backup.id }
output "kms_key_arn" { value = aws_kms_key.backup.arn }
